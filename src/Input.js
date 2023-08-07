import React, { useState } from "react";
import "./App.css";
import { contacts } from "./ContactList.js";

function Input(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange,
  };
}

function OpenContact(initialValue) {
  const [contact, setContact] = useState(initialValue);

  const open = (newContact) => {
    setContact(newContact);
  };

  const close = () => {
    setContact(null);
  };

  return {
    contact,
    open,
    close,
  };
}

function Data(input) {
  let result = [];

  let arr = contacts.filter((e) =>
    e.firstName.toLowerCase().includes(input.toLowerCase())
  );

  if (arr.length > 0) {
    arr.map((e) => result.push(e));
  }
  console.log(result);
  return result;
}

function App() {
  const input = Input("");
  const data = Data(input.value);
  const openContact = OpenContact(null);

  const click = (contact) => {
    openContact.open(contact);
  };

  return (
    <div className={"pt-3"}>
      
      <div className="container">
        <h1 >Контакти</h1>
        <form className="nosubmit">
          <input
            className="nosubmit"
            type="search"
            placeholder="Search..."
            {...input}
          />
        </form>
      </div>
      {openContact.contact ? (
        <div>
          <h2 className="pb-3">{openContact.contact.firstName} {openContact.contact.lastName}</h2>
          <p>phone: {openContact.contact.phone}</p>
          <p>gender: {openContact.contact.gender}</p>
          <button type="button" class="btn btn-link" onClick={openContact.close}>назад</button>
        </div>
      ) : (
        <div>
          {data.map((contact, index) => (
            <div key={index} onClick={() => click(contact)}>
              <p>{contact.firstName}</p>
              {index < data.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
