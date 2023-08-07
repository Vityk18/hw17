import React, { useState } from "react";
import "./App.css";
import { contacts } from "./ContactList.js";

function Input() {
  const [value, setValue] = useState("");

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

function Data(input, manButton, womenButton) {
  let result = [];

  let arr = contacts.filter((e) => {
    return (
      e.firstName.toLowerCase().includes(input.toLowerCase()) ||
      e.lastName.toLowerCase().includes(input.toLowerCase()) ||
      e.phone.toLowerCase().includes(input.toLowerCase())
    );
  });

  if (!manButton) {
    arr = contacts.filter((e) => {
      console.log(e.gender == "male");
      return e.gender !== "male";
    });
  }

  if (!womenButton) {
    arr = contacts.filter((e) => {
      return e.gender !== "female";
    });
  }
  console.log(arr);
  arr.map((e) => result.push(e));

  return result;
}

function App() {
  const [manButton, setManButton] = useState(true);
  const [womenButton, setWomenButton] = useState(true);

  function changeManButton() {
    setManButton(!manButton);
  }

  function changeWomanButton() {
    setWomenButton(!womenButton);
  }
  console.log(`men --- ` + manButton);
  console.log(`women --- ` + womenButton);

  const input = Input();
  const data = Data(input.value, manButton, womenButton);
  const openContact = OpenContact(null);

  const click = (contact) => {
    openContact.open(contact);
  };

  return (
    <div className="list">
      <div className="container">
        {!openContact.contact && (
          <>
            <h1 className="pb-3">Контакти</h1>
            <div>
              <div className="form-check form-switch">
                <input
                  onClick={changeManButton}
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Чоловіки
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  onClick={changeWomanButton}
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Жінки
                </label>
              </div>
            </div>
            <form className="pt-3 nosubmit">
              <input
                className="nosubmit"
                type="search"
                placeholder="Search..."
                {...input}
              />
            </form>
          </>
        )}
      </div>
      {openContact.contact ? (
        <div>
          <h2 className="pb-3 pt-3">
            {openContact.contact.firstName} {openContact.contact.lastName}
          </h2>
          <p>phone: {openContact.contact.phone}</p>
          <p>gender: {openContact.contact.gender}</p>
          <button
            type="button"
            className="btn btn-link"
            onClick={openContact.close}
          >
            назад
          </button>
        </div>
      ) : (
        <div>
          {data.length > 0 ? (
            data.map((contact, index) => (
              <div key={index} onClick={() => click(contact)}>
                <p>
                  {contact.firstName} {contact.lastName}
                </p>
                {index < data.length - 1 && <hr />}
              </div>
            ))
          ) : (
            <div>
              <p className="nosubmit">Немає збігів для {input.value}</p>{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
