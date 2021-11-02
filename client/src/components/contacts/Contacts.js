import React, { Fragment, useContext } from 'react'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/ContactContext'

const Contacts = () => {
    // access to any state or methods or  
    const contactContext = useContext(ContactContext)

    // initialized contacts
    const { contacts } = contactContext;

    return (
        <Fragment>
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact}/>
            ))}
        </Fragment>
    )
}

export default Contacts
