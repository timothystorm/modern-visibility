import * as z from 'zod';

export const MilestoneEnum = z.enum(["LabelCreated", "InTransit", "OutForDelivery", "Delivered"]);
export type Milestone = z.infer<typeof MilestoneEnum>;
