import { useState } from 'react';
// import { FolderData } from '../data/folderData';

export default function Folder({ handleInsertNode, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();

    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // Add Logic
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          className='folder'
          style={{ cursor: 'pointer' }}
          onClick={() => setExpand(!expand)}
        >
          <span>📁{explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>

        <div style={{ display: expand ? 'block' : 'none', paddingLeft: 10 }}>
          {showInput.visible && (
            <div className='inputContainer'>
              <span>{showInput.isFolder ? '📁' : '📝'}</span>
              <input
                type='text'
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
                onKeyDown={onAddFolder}
                className='inputContainer_input'
              />
            </div>
          )}

          {explorer.items.map((item) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={item.id}
                explorer={item}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className='file'>📝{explorer.name}</span>;
  }
}
