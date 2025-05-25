import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../Config/firebaseConfig";
import Spinner from "react-bootstrap/Spinner";
import "./AllJobs.css";

export const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInRecruiter = JSON.parse(
      localStorage.getItem("loggedInRecruiter")
    );

    const fetchAllJobs = async () => {
      const docRef = doc(db, "recruiters", loggedInRecruiter.user.displayName);
      const getDocRef = await getDoc(docRef);
      console.log(getDocRef);
      if (getDocRef.exists()) {
        const data = getDocRef.data();
        console.log(data.jobs);
        setJobs(data.jobs || []);
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, []);

  if (loading) {
    return (
      <>
        <Spinner animation="grow" />
        <p>Loading...</p>
      </>
    );
  }
  return (
    <div className="jobs-container">
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h1>JobRole :{job.jobRole}</h1>
            <h2>Company :{job.company}</h2>
            <p>JobDescription:{job.jd}</p>
          </div>
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};
