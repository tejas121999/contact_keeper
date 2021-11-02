import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './ContactContext';
import contactREducer from './ContactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../type'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'tejas talkar',
                email: 'tejas@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'savio leo',
                email: 'savio@gmail.com',
                phone: '123-4516-78190',
                type: 'personal'
            },
            {
                id: 3,
                name: 'manoj choudhari',
                email: 'manoj@gmail.com',
                phone: '789-654-1230',
                type: 'professional'
            },
        ]
    };

    const [state, dispatch] = useReducer(contactREducer, initialState);

    // Add Contact
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }
    // Delete Contact

    // Set Current Contact

    // Cleare Current Contact

    // Update Contact

    // Filter Contact

    // Cleare contact

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;