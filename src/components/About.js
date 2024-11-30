import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Workflow Canvas</h1>
          <p className="text-xl text-gray-600">
            Your thought partner for turning ideas into action
          </p>
        </section>

        {/* Vision Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-6">
            In today's world, many self-motivated individuals have valuable ideas and knowledge to share
            - whether it's through blogs, tutorials, or educational content. However, they often face
            two major hurdles: the overwhelming complexity of planning and the challenge of articulating
            their thoughts effectively.
          </p>
          <p className="text-gray-700">
            Workflow Canvas aims to be your thought partner - as natural as having a conversation with
            a friend who helps you clarify your thoughts, provides structure without imposing rigidity,
            and turns abstract ideas into actionable steps.
          </p>
        </section>

        {/* Core Features */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Natural Conversation</h3>
            <p className="text-gray-600">
              Plan your projects as naturally as talking to a friend. No complex interfaces or rigid
              structures.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Thought Clarity</h3>
            <p className="text-gray-600">
              Transform abstract ideas into clear, structured plans through guided dialogue and
              organization.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Simple Actions</h3>
            <p className="text-gray-600">
              Break down complex projects into manageable steps while maintaining momentum.
            </p>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Perfect For</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Blog Creation</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Brainstorm topics and themes</li>
                  <li>Develop content structure</li>
                  <li>Create posting schedule</li>
                  <li>Track writing progress</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Teaching Concepts</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Break down complex topics</li>
                  <li>Design learning progression</li>
                  <li>Create practice exercises</li>
                  <li>Plan delivery method</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Personal Projects</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Capture initial inspiration</li>
                  <li>Define scope and goals</li>
                  <li>Set realistic milestones</li>
                  <li>Maintain momentum</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Join Community */}
        <section className="text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Help us build a tool that truly serves our community's needs. Share your ideas,
            contribute to discussions, and shape the future of Workflow Canvas.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              GitHub
            </a>
            <a
              href="#"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Discord
            </a>
            <a
              href="#"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Twitter
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
