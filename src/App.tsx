/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import Folder from './components/folder';
import explorer from './data/folderData';
import './App.css';
import useTraverseTree from './hooks/use-traverse-tree';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <div>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}

export default App;
