import prisma from "../utils/prisma";
import logger from "../utils/logger";
import type { Prisma } from "../generated";
import type { ActivityAction, ActivityEntity } from "../generated";

interface LogActivityParams {
    action: ActivityAction;
    entity: ActivityEntity;
    entityId?: number;
    orgId: string;
    actorId?: string;
    metadata?: Record<string, unknown>;
}

export async function logActivity(params: LogActivityParams): Promise<void> {
    const { action, entity, entityId, orgId, actorId, metadata } = params;
    try {
        await prisma.activityLog.create({
            data: {
                action,
                entity,
                entity_id: entityId ?? null,
                org_id: orgId,
                actor_id: actorId ?? null,
                metadata: (metadata as Prisma.InputJsonValue) ?? undefined,
            },
        });
    } catch (err) {
        logger.error(
            `Failed to log activity: ${action} ${entity} ${entityId ?? ""}`,
            err,
        );
    }
}
