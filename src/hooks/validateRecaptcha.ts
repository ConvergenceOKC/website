import type { CollectionBeforeValidateHook } from 'payload';

import { getMinScore, verifyRecaptcha } from '@/utilities/verifyRecaptcha';

export const validateRecaptcha: CollectionBeforeValidateHook = async ({
  data,
  req,
  z,
}) => {
  // Extract reCAPTCHA token from the request data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recaptchaToken = (req.data as any)?.recaptchaToken;

  if (!recaptchaToken) {
    throw new Error('reCAPTCHA token is required');
  }

  try {
    // Verify the reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    // Check if reCAPTCHA verification was successful
    if (!recaptchaResult.success) {
      console.error(
        'reCAPTCHA verification failed:',
        recaptchaResult['error-codes'],
      );
      throw new Error('reCAPTCHA verification failed');
    }

    // Check the score (v3 returns a score from 0.0 to 1.0)
    const minScore = getMinScore();
    if (
      recaptchaResult.score !== undefined &&
      recaptchaResult.score < minScore
    ) {
      console.warn(
        `reCAPTCHA score too low: ${recaptchaResult.score} (minimum: ${minScore})`,
      );
      throw new Error(
        'Suspicious activity detected. Please try again or contact support if the problem persists.',
      );
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    throw error instanceof Error
      ? error
      : new Error('reCAPTCHA verification failed');
  }

  return data;
};
