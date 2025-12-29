import React from 'react';

interface CourseSchemaProps {
  courseName: string;
  description: string;
  provider?: string;
  educationalLevel?: string | string[];
}

export default function CourseSchema({
  courseName,
  description,
  provider = 'Statecraft Simulations',
  educationalLevel,
}: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseName,
    "description": description,
    ...(educationalLevel ? { educationalLevel } : {}),
    "provider": {
      "@type": "Organization",
      "name": provider,
      "sameAs": "https://statecraftsims.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

