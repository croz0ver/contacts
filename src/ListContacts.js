import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
    state = {
        query: '',
    }
    updateQuery = (query) => {
        this.setState({query: query.trim() });
    }
    clearQuery = () => {
        this.setState({query: ''});
    }
    render() {
        const {contacts, onDeleteContact } = this.props;
        const { query } = this.state;

        console.log('Props', this.props);
        let showingContatcts;
        if(this.state.query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingContatcts = contacts.filter((contact) => match.test(contact.name))
        }
        else {
            showingContatcts = contacts;
        }
        showingContatcts.sort(sortBy('name'));
        return(
            <div className='list-contacts'>
                {/*
                comentarios... 
                {JSON.stringify(this.state)} 
                */}
            <div className='list-contacts-top'>
                <input className='search-contacts' type='text' placeholder='Search contacts' 
                value= {this.state.query} 
                onChange ={(event) => this.updateQuery(event.target.value)} />
            </div>
            {showingContatcts.length !== contacts.length && (
                <div className = 'showing-contacts'>
                    <span> Now showing {showingContatcts.length} of {contacts.length} total </span>
                    <button onClick= {this.clearQuery}> Show all </button>
                </div>
            )}
                <ol className='contact-list'>
                    {showingContatcts.map((contact) => 
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}>
                            </div>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                                remove
                            </button>
                        </li>
                    )}

                </ol>
            </div>
        );
    }
}



export default ListContacts;