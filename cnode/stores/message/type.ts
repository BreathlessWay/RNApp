export type MessageStateType = {
	loading: boolean;
	error: string;
	has_read_messages: Array<MessageItemType>;
	hasnot_read_messages: Array<MessageItemType>;
};

export type GetMessageSuccessActionPayloadType = {
	has_read_messages: Array<MessageItemType>;
	hasnot_read_messages: Array<MessageItemType>;
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
	messageIds: Array<string>;
};

export type MarkAllReadFailedActionPayloadType = {
	error: string;
};

export type MessageItemType = {
	id: string;
	type: string;
	has_read: boolean;
	author: {
		loginname: string;
		avatar_url: string;
	};
	topic: {
		id: string;
		title: string;
		last_reply_at: string;
	};
	reply: {
		id: string;
		content: string;
		ups: Array<string>;
		create_at: string;
	};
	create_at: string;
};

export type MessageResultType = {
	success: boolean;
	data: {
		has_read_messages: Array<MessageItemType>;
		hasnot_read_messages: Array<MessageItemType>;
	};
};

export type MarkAllReadResultType = {
	success: boolean;
	marked_msgs: Array<{ id: string }>;
};
