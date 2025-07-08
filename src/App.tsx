import { useState } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header with Tailwind classes */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Financial Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Testing Material-UI + Tailwind CSS
        </p>
      </div>

      {/* Main content area */}
      <div className="max-w-4xl mx-auto">
        {/* Material-UI Card with Tailwind spacing */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" component="h2" className="mb-4">
              Counter Component
            </Typography>

            {/* Counter display with Tailwind styling */}
            <div className="text-center mb-4">
              <span className="text-6xl font-bold text-blue-600">{count}</span>
            </div>

            {/* Material-UI Buttons with Tailwind spacing */}
            <Box className="flex gap-4 justify-center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setCount(count + 1)}
                className="px-6 py-2"
              >
                Increment
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RemoveIcon />}
                onClick={() => setCount(count - 1)}
                className="px-6 py-2"
              >
                Decrement
              </Button>

              <Button
                variant="text"
                color="error"
                onClick={() => setCount(0)}
                className="px-6 py-2"
              >
                Reset
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Test section with pure Tailwind */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Tailwind Test
            </h3>
            <p className="text-gray-600">
              This card uses only Tailwind CSS classes for styling.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Material-UI Test
            </h3>
            <p className="text-red-600 ">
              This card uses Material-UI components with Tailwind spacing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
