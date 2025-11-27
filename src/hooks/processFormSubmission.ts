import mailchimp from '@mailchimp/mailchimp_marketing';
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

      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      if ('id' in response) {
        payload.logger.info(
          `Successfully added subscriber to Mailchimp list: ${response.id}`,
        );
      }
    } catch (error) {
      payload.logger.error(
        `Error processing Mailchimp subscription: ${error.response?.body.detail || error.message}`,
      );
    }
  }
};
