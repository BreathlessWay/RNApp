export type MessageStateType = {};

export type GetMessageSuccessActionPayloadType = {
	list: [];
};

export type GetMessageFailedActionPayloadType = {
	error: string;
};

export type MarkReadActionPayloadType = {
	messageId: string;
};

export type MarkReadSuccessActionPayloadType = {
	messageId: string;
};

export type MarkReadFailedActionPayloadType = {
	error: string;
};

export type MarkAllReadSuccessActionPayloadType = {
	messageId: Array<string>;
};

export type MarkAllReadFailedActionPayloadType = {
	error: string;
};
