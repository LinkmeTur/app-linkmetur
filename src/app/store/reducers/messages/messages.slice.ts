import { createSlice } from '@reduxjs/toolkit';
import fetchChatHistory from './thunk/fetchChatHistory.thunk';
import { TCorporation } from '../corporation/corporation.slice';
import fetchContacts from './thunk/fetchContacts,thunk';

interface ChatMessage {
    id: number;
    remetenteID: string;
    destinatarioID: string;
    conteudo: string;
}

export interface Contact {
    corporationID: string;
    contactID: string;
    saved_contact: boolean;
    favorited_contact: boolean;
    corporation?: TCorporation;
    contato?: TCorporation;
}

interface ChatState {
    contacts: Contact[];
    messages: ChatMessage[];
}

const initialState: ChatState = {
    contacts: [],
    messages: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action) => {
            state.contacts = state.contacts.filter(
                (contact) => contact.contactID !== action.payload,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChatHistory.fulfilled, (state, action) => {
            state.messages = action.payload;
        });
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.contacts = action.payload;
        });
    },
});

export const { addMessage, addContact, removeContact } = chatSlice.actions;
export default chatSlice.reducer;
