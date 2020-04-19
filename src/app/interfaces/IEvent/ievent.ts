import { EventStatus } from 'src/app/enums/EventStatus/event-status.enum';
import { Guid } from 'guid-typescript';
import { Victim } from '../Victim/victim';

export interface IEvent {
    Timestamp: any;
    Caller: string;
    Description: string;
    Location: string;
    Status: EventStatus;
    UUID: string;
    Victim: Victim;
    Responder: string;
    Severity: string;
}
