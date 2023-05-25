import { InferType } from 'yup';

import { addMemberInputSchema } from '@/helpers/schemas';

export type ADdMemberInput = InferType<typeof addMemberInputSchema>;
