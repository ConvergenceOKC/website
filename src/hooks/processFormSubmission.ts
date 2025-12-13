import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';
import type { CollectionAfterChangeHook } from 'payload';

export const processFormSubmission: CollectionAfterChangeHook = async ({
  doc: {
    form: { title, id },
    submissionData,
  },
  req: { payload },
}) => {
  if (id === process.env.NEWSLETTER_FORM_ID && submissionData) {
    try {
      // Send data to Mailchimp
      payload.logger.info(`Sending newsletter subscriber data to Mailchimp...`);

      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER_PREFIX,
      });

      const listId = process.env.MAILCHIMP_AUDIENCE_ID || '';

      const subscribingUser = {
        firstName: submissionData[0].value || '',
        lastName: submissionData[1].value || '',
        email: submissionData[2].value || '',
      };

      // Create MD5 hash of lowercase email for subscriber_hash
      const subscriberHash = crypto
        .createHash('md5')
        .update(subscribingUser.email.toLowerCase())
        .digest('hex');

      // Check if member already exists
      let existingMember;
      let wasUnsubscribed = false;
      try {
        existingMember = await mailchimp.lists.getListMember(
          listId,
          subscriberHash,
        );
        wasUnsubscribed = existingMember.status === 'unsubscribed';
      } catch (error) {
        // Member doesn't exist, which is fine
        existingMember = null;
      }

      // Use setListMember (PUT) which creates or updates the member
      // This handles resubscribers who previously unsubscribed
      const response = await mailchimp.lists.setListMember(
        listId,
        subscriberHash,
        {
          email_address: subscribingUser.email,
          status_if_new: 'subscribed',
          status: 'subscribed', // This will resubscribe if they were unsubscribed
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName,
          },
        },
      );

      if ('id' in response) {
        let action;
        if (!existingMember) {
          action = 'added new subscriber';
        } else if (wasUnsubscribed) {
          action = 'resubscribed';
        } else {
          action = 'updated existing subscriber';
        }
        payload.logger.info(
          `Successfully ${action} in Mailchimp list: ${response.id} (${response.email_address})`,
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as any)?.response?.body?.detail || 'Unknown error';
      payload.logger.error(
        `Error processing Mailchimp subscription: ${errorMessage}`,
      );
    }
  }
};
