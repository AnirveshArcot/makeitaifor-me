import React, { useState } from "react";

interface SendEmailToFounderProps {
  name: string;
  email: string;
  message: string;
}

function SendEmailToFounder() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendEmail = async () => {
    if (!name || !email || !message) return;
    setIsLoading(true);
    setStatus(null);
    try {
      const response = await fetch("http://localhost:3000/emails/contact-founder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();
      setStatus(result.status);
      if (result.status === "Email sent successfully.") {
        setMessage("Email Sent!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Failed to send email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="section2"
      className="md:h-screen bg-orange-500 mt-4 mb-20 rounded p-4 md:pb-20"
    >
      <h1 className="text-3xl pb-6 text-black">Send Email to Founder</h1>
      <div className="flex flex-col gap-8 p-4 h-full">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eos
          dolorem iure ipsum officia mollitia assumenda at vel porro dolore?
          Minima laborum totam accusantium, harum consequuntur id! Impedit
          corrupti libero tenetur doloremque adipisci reiciendis velit alias
          debitis laudantium, totam recusandae.
        </p>

        <div className="mockup-browser border-base-300 bg-gray-900 border h-full overflow-y-auto z-0">
          <div className="mockup-browser-toolbar flex justify-between p-2">
            <label className="input input-bordered flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                className="grow outline-none text-black"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="grow outline-none text-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="grow outline-none text-black"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="btn btn-sm btn-success"
                onClick={handleSendEmail}
                disabled={isLoading}
              >
                Send
              </button>
            </label>
            <button className="btn btn-sm btn-error" onClick={() => { setName(""); setEmail(""); setMessage(""); setStatus(null); setIsLoading(false); }}>
              Clear
            </button>
          </div>

          <div className="border-base-300 flex flex-wrap justify-center border-t p-4 text-black">
            {isLoading ? (
              <span className="loading loading-dots loading-lg flex justify-center py-16"></span>
            ) : status ? (
              <div className="flex justify-center py-16 text-white">{status}</div>
            ) : (
              <div className="flex justify-center py-16 text-white"></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SendEmailToFounder;
