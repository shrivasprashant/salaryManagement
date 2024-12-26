import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LabourList from './components/LabourList';
import AddLabour from './components/AddLabour';
import EditLabour from './components/EditLabour';  // Import as default
import SalaForm from './components/SalaryForm';
import SalaryForm from './components/SalaryForm';
import SalaryList from './components/SalaryList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use Routes in React Router v6 */}
          <Route path="/labour-list" element={<LabourList />} />
          <Route path="/add-labour" element={<AddLabour />} />
          <Route path="/edit-labour/:id" element={<EditLabour />} />
          <Route path="/" element={<LabourList />} />
          <Route path="/salary-form" element={<SalaForm />} />
        </Routes>
        <SalaryList />
      </div>
    </Router>
  );
}

export default App;
