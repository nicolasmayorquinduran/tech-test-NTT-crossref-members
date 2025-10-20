import { MemberDto } from '../../code-gen/custom-api/models/MemberDto';

/**
 * Tipos de eventos disponibles en el EventBus
 */
/**
 * Event types available in the EventBus.
 */
export const EventTypes = {
  MEMBER_LOGGED_IN: 'member.logged_in',
  MEMBER_LOGGED_OUT: 'member.logged_out',
} as const;

/**
 * Typed payloads for each event type.
 */
export interface EventPayloads {
  [EventTypes.MEMBER_LOGGED_IN]: MemberDto;
  [EventTypes.MEMBER_LOGGED_OUT]: void;
}

/**
 * Helper type to retrieve the payload type for a given event.
 */
export type EventPayload<T extends keyof EventPayloads> = EventPayloads[T];
