import React, { useState, useEffect } from 'react';
import { Button } from "antd";

/**
 * Situation: The TestForm component was written by a junior developer who needs some help getting it to function.
 * Please `modify the TestForm component` such that it will `correctly use hooks` `to validate` `and post` to the endpoint.
 * Feel free to use any (or no) external libraries you feel appropriate.
 * Endpoint docs: https://jsonplaceholder.typicode.com/guide/
 */

export default function Question1(props) {

  const defaultState = {
    title: '',
    body: '',
    userId: 1337,
  }

  const [state, setState] = useState(defaultState);
  const [errormessage, setErrormessage] = useState('');
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!state.title) {
      setErrormessage("You need to enter a title! 😊");
    } else {
      setErrormessage('');
      setResponse(null);
    }
  }, [state.title]);

  const handleSubmit = () => {
    const {title, body, userId} = state;

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({title, body, userId}),
    })
      .then(response => response.json())
      .then(json => {
        setResponse(json);
        setState(defaultState);
      })
  }

  const onChangeValue = (event, prop) => {
    const {target: {value}} = event;
    setState({...state, [prop]: value});
  }

  return (
    <div>
      <div>
        <div>
          Title:
        </div>
        <input
          value={state.title}
          onChange={(event) => {
          onChangeValue(event, 'title')
        }}/>
      </div>

      <div>
        <div>
          Body:
        </div>
        <input
          value={state.body}
          onChange={(event) => {onChangeValue(event, 'body')}} />
      </div>

      <div>
        <div>
          UserId:
        </div>
        <select
          value={state.userId}
          onChange={(event) => {onChangeValue(event, 'userId')}}>
          <option>1337</option>
          <option>1234</option>
          <option>1066</option>
        </select>
      </div>

      <div style={{color: "red", marginTop: 10}}>
        {errormessage}
      </div>

      <Button disabled={!!errormessage} onClick={handleSubmit} style={{margin: 10}}>Submit</Button>

      <div>{response && JSON.stringify(response)}</div>

    </div>

  )
}
