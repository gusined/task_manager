import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const HardwareDashboard = () => {
  const [hardwareItems, setHardwareItems] = useState([
    { id: 1, name: 'GPU (RTX 3080)', value: 45 },
    { id: 2, name: 'CPU (i9-12900K)', value: 30 },
    { id: 3, name: 'RAM (32GB)', value: 60 }
  ]);
  
  const [newItem, setNewItem] = useState({ name: '', value: '' });

  const handleAddItem = () => {
    if (newItem.name && newItem.value) {
      setHardwareItems([
        ...hardwareItems,
        {
          id: Date.now(),
          name: newItem.name,
          value: parseInt(newItem.value)
        }
      ]);
      setNewItem({ name: '', value: '' });
    }
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Custom Hardware Monitoring
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <LineChart width={600} height={300} data={hardwareItems}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </Grid>
        
        <Grid item xs={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField
              label="Component Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <TextField
              label="Value (%)"
              type="number"
              value={newItem.value}
              onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
            />
            <Button variant="contained" onClick={handleAddItem}>
              Add Component
            </Button>
            
            <div style={{ marginTop: '20px' }}>
              {hardwareItems.map((item) => (
                <div key={item.id} style={{ marginBottom: '10px' }}>
                  <strong>{item.name}:</strong> {item.value}%
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HardwareDashboard;
