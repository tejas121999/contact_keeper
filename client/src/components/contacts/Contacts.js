import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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

    console.log(filtered)
    console.log(contacts)
    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null
                    ? filtered.map(contact => (
                        <CSSTransition key={contact.id} timeout={5000} classNames="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ))
                    : contacts.map(contact => (
                        <CSSTransition key={contact.id} timeout={5000} classNames="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts
