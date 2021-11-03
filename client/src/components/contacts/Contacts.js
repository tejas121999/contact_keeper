import React, { Fragment, useContext } from 'react'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/ContactContext'

const Contacts = () => {
    // access to any state or methods or  
    const contactContext = useContext(ContactContext)

    // initialized contacts
    const { contacts, filtered } = contactContext;

    if (contacts.length === 0) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>(
            {filtered !== null
                ? filtered.map(contact => (

                    <ContactItem contact={contact} />

                ))
                : contacts.map(contact => (

                    <ContactItem contact={contact} />

                ))}
        </Fragment>
    )
}

export default Contacts
