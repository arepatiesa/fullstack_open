import React from "react";

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Header = ({ course }) => <h2>{course.name}</h2>;

const Content = ({ content }) => (
  <>
    {content.map((course) => (
      <Part key={course.id} part={course} />
    ))}
  </>
);

const Total = ({ total }) => {
  const sum = total.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <p>
      <b>Total of {sum} exercises</b>
    </p>
  );
};

const Course = ({ courses, title }) => {
  return (
    <>
      <h1>{title}</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content content={course.parts} />
          <Total total={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
