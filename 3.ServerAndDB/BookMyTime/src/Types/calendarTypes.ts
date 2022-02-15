export interface IDataToEdit {

}

export interface IDataToCreateEvent {
    summary: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
}

export interface IDataToCreateEventInDB extends IDataToCreateEvent {
    eventId: string;
}

export interface IDataToUpdateEvent extends IDataToCreateEventInDB {
    
}