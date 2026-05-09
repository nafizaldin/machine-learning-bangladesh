'use client';
import React from 'react';
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Achievements = ({ project }) => {
  const { achievement } = project;

  console.log(achievement,'achievement')

  return (
    <section className="component-gap-y ca-project-achievements">
      <div className="body">
        <div className="section flex flex-col lg:flex-row items-center gap-6">
          {/* Left Text */}
          <div className="left flex-1">
            <h4 className="gradient-text">Achievements</h4>
            {achievement?.text ? (
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.25rem' }}>
                <li>
                  <p dangerouslySetInnerHTML={{ __html: achievement.text }} />
                </li>
              </ul>
            ) : (
              <ul>
                {achievement?.steps?.map((bullet, i) => (
                  <li key={i}>
                    <p>{bullet}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Image */}
          <div className="right flex-1">
            {achievement?.image && (
              <Image
                src={`${baseUrl}${achievement.image}`}
                alt={achievement?.alt || 'Achievement Image'}
                width={500}
                height={500}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
