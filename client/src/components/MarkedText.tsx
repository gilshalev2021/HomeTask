import React from 'react';

const LinkWithMarkedTerms = (props:any) => {
  
  const termRegex = new RegExp(`(${props.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

  const parts = props.lineText.split(termRegex);
  
  const renderMarkedText = (part:string, index: number) => {
  
    const isTermMatched = part.toLowerCase() === props.term.toLowerCase();

    let background = isTermMatched ? 'yellow' : 'transparent';
   
    if(props.term == '')
        background = 'transparent';

    return (
      <span key={index} style={{ background }}>
        {part}
      </span>
    );
  };

  return (
    <p> {parts.map((part:string, index:number) => renderMarkedText(part, index))}</p>
  );
  
};

export default LinkWithMarkedTerms;
