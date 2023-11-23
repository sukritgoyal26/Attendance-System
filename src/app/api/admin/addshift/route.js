

import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import ShiftModel from "../../../../../backend/models/Shift";

const addShiftHandler = async (request) => {
  try {
    // Extract the field values from the request body
    const {
      shiftName,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    } = await request.json();

    console.log("Received data:", {
      shiftName,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });

    // Calculate working hours for each day
    const calculateWorkingHours = (startTime, endTime) => {
      console.log("Calculating working hours for", startTime, "to", endTime);

      // Convert time strings to 24-hour format "HH:mm"
      const startParts = startTime.split(" ");
      const endParts = endTime.split(" ");
      const startAmPm = startParts[1];
      const endAmPm = endParts[1];
      let startHour = parseInt(startParts[0].split(":")[0]);
      let endHour = parseInt(endParts[0].split(":")[0]);

      if (startAmPm === "PM" && startHour !== 12) {
        startHour += 12;
      } else if (startAmPm === "AM" && startHour === 12) {
        startHour = 0;
      }

      if (endAmPm === "PM" && endHour !== 12) {
        endHour += 12;
      } else if (endAmPm === "AM" && endHour === 12) {
        endHour = 0;
      }

      const startFormatted = `${startHour.toString().padStart(2, "0")}:${
        startParts[0].split(":")[1]
      }`;
      const endFormatted = `${endHour.toString().padStart(2, "0")}:${
        endParts[0].split(":")[1]
      }`;

      console.log("Formatted start:", startFormatted);
      console.log("Formatted end:", endFormatted);

      const start = new Date(`1970-01-01T${startFormatted}:00`);
      const end = new Date(`1970-01-01T${endFormatted}:00`);

      console.log("Parsed start:", start);
      console.log("Parsed end:", end);

      const millisecondsInAnHour = 3600000; // 1000 ms * 60 sec * 60 min

      const workingHours = (end - start) / millisecondsInAnHour;
      console.log("Calculated working hours:", workingHours);

      return workingHours;
    };

    // Calculate and assign working hours to each day
    const shiftData = {
      shiftName,
      monday: {
        ...monday,
        workingHours: monday.isOffDay
          ? 0
          : calculateWorkingHours(monday.startTime, monday.endTime),
      },
      tuesday: {
        ...tuesday,
        workingHours: tuesday.isOffDay
          ? 0
          : calculateWorkingHours(tuesday.startTime, tuesday.endTime),
      },
      wednesday: {
        ...wednesday,
        workingHours: wednesday.isOffDay
          ? 0
          : calculateWorkingHours(wednesday.startTime, wednesday.endTime),
      },
      thursday: {
        ...thursday,
        workingHours: thursday.isOffDay
          ? 0
          : calculateWorkingHours(thursday.startTime, thursday.endTime),
      },
      friday: {
        ...friday,
        workingHours: friday.isOffDay
          ? 0
          : calculateWorkingHours(friday.startTime, friday.endTime),
      },
      saturday: {
        ...saturday,
        workingHours: saturday.isOffDay
          ? 0
          : calculateWorkingHours(saturday.startTime, saturday.endTime),
      },
      sunday: {
        ...sunday,
        workingHours: sunday.isOffDay
          ? 0
          : calculateWorkingHours(sunday.startTime, sunday.endTime),
      },
    };

    // Create a new instance of the 'Shift' model and assign the calculated shiftData
    const newShift = new ShiftModel(shiftData);

    // Save the new Shift to the database
    const savedShift = await newShift.save();

    console.log("new shift", savedShift);
    return NextResponse.json(
      {
        savedShift,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving Shift:", error);
    return NextResponse.json(
      {
        message: "Failed to add shift",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(addShiftHandler);
