// Function to generate events for multiple weeks based on a given start date
export const generateWeeklyEvents = (startDate, numberOfWeeks) => {
    const events = [];
    const daysInWeek = 7;
  
    for (let i = 1; i <= numberOfWeeks; i++) { // Start from 1 instead of 0
      const startOfWeek = new Date(startDate);
      startOfWeek.setDate(startOfWeek.getDate() + ((i - 1) * daysInWeek)); // Adjusted calculation for start date
  
      // Add events for the week
      events.push(
        {
          title: "System Provisioning and Config.",
          start: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate(), 10, 0), // Monday, 10:00 AM
          end: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate(), 11, 0),   // Monday, 11:00 AM
          location: "Classroom 11114",
          Teacher: "Mitali Chugh"
        },
        {
          title: "Applied Devops",
          start: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate(), 13, 0),  // Monday, 1:00 PM
          end: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate(), 14, 50),   // Monday, 2:50 PM
          location: "Classroom 11114",
          Teacher: "Mitali Chugh"
        },
        {
          title: "Test Automation Lab",
          start: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate(), 15, 0),  // Monday, 3:00 PM
          end: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate(), 16, 50),   // Monday, 4:50 PM
          location: "Classroom 10004",
          Teacher: "Mitali Chugh"
        },
        {
          title: "Applied Devops",
          start: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 1, 13, 0), // Tuesday, 1:00 PM
          end: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 1, 15, 50),  // Tuesday, 2:50 PM
          location: "Classroom 11112",
          Teacher: "Mitali Chugh"
        },
        // Add other events for the week following the same format
      );
    }
  
    return events;
  };
  
  // Generate events for 4 weeks starting from May 9, 2024
  export const events = generateWeeklyEvents(new Date(2024, 4, 13), 4);