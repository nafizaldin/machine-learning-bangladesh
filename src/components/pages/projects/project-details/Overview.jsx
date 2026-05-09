'use client';
import React from 'react';
import { LearnMoreBtn } from '@/components/utilityComponents';
import Image from 'next/image';
import { addBaseUrl } from '@/utils/cleanHtml';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const Overview = ({ project }) => {
  const { description, problemStatement, solutionImplemented, visualDesign, featuredImage } = project;
   

  return (
    <section className="component-gap-y ca-project-overview">
      {/* Top Description */}
      <div className="top">
        <h3>
          Project <span className="text-color">Overview</span>
        </h3>
        <p dangerouslySetInnerHTML={{ __html:  addBaseUrl(description, baseUrl) }} />
      </div>

      <div className="body">
        {/* Problem Statement */}
        <div className="problem-statement flex flex-col lg:flex-row items-center gap-6">
          <div className="left-text flex-1">
            <h1 className="gradient-text">Problem Statement</h1>
            <p dangerouslySetInnerHTML={{ __html: problemStatement?.text || '' }} />
          </div>
          <img
            className="img flex-1"
            src={`${baseUrl}${featuredImage}`}
            alt="project banner"
            width={500}
            height={300}
          />
        </div>

        {/* Solution Implemented */}
        <div className="solutionImplemented flex flex-col lg:flex-row items-center gap-6 mt-12">
          <div className="left flex-1">
            <h4 className="gradient-text">Solution Implemented</h4>
            <ul style={{ listStyleType: 'circle', paddingLeft: '1.25rem' }}>
              <li>
                <p dangerouslySetInnerHTML={{ __html: solutionImplemented?.text || '' }} />
              </li>
            </ul>
          </div>
          <div className="right flex-1">
            {solutionImplemented?.image && (
              <img
                height={500}
                width={500}
                src={`${baseUrl}${solutionImplemented.image}`}
                alt="Solution Image"
              />
            )}
          </div>
        </div>

        {/* Visual Design */}
        <div className="visualDesign flex flex-col lg:flex-row items-center gap-6 mt-12">
          <div className="left flex-1">
            {visualDesign?.image && (
              <img
                height={500}
                width={500}
                src={`${baseUrl}${visualDesign.image}`}
                alt="Visual Design Image"
              />
            )}
          </div>
          <div className="right flex-1">
            <h4 className="gradient-text">Visual Design</h4>
            <ul style={{ listStyleType: 'circle', paddingLeft: '1.25rem' }}>
              <li>
                <p dangerouslySetInnerHTML={{ __html: visualDesign?.text || '' }} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
