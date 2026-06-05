function NegativeForm({
  feedback,
  setFeedback,
  name,
  setName,
  email,
  setEmail,
}) {
  return (
    <div>
      <textarea
        rows="4"
        placeholder="Tell us what went wrong..."
        value={feedback}
        onChange={(e) =>
          setFeedback(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full border p-3 rounded-lg mt-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border p-3 rounded-lg mt-3"
      />
    </div>
  );
}

export default NegativeForm;