import React, { useContext, useState, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
    // access to any state or methods
    const contactContext = useContext(ContactContext)

    const { addContact, clearCurrent, updateContact, current } = contactContext
    // edit user
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current])
    // add contact
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const { name, email, phone, type } = contact;

    const onChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        }else{
            updateContact(contact)
        }
        // setContact({
        //     name: '',
        //     email: '',
        //     phone: '',
        //     type: 'personal'
        // })
        cleareAll();
    }

    const cleareAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={onChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input
                type="radio"
                name="type"
                value="personal"
                checked={type === 'personal'}
                onChange={onChange}
            /> personal {''}
            <input
                type="radio"
                name="type"
                value="professional"
                checked={type === 'professional'}
                onChange={onChange}
            /> Professional
            <div>
                <input
                    type="submit"
                    value={current ? 'Edit Contact' : 'Add Contact'}
                    className="btn btn-primary btn-block"
                />
            </div>
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={cleareAll}>
                        Cleare
                    </button>
                </div>
            )}
        </form>
    )
}

export default ContactForm
