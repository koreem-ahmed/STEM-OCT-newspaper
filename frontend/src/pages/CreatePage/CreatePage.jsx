import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNewspaperStore } from "../../store/Newspaper.js";
import { toast } from "sonner";
import "./Create.scss";

const CreatePage = () => {
  const navigate = useNavigate();
  const [newNewspaper, setNewNewspaper] = useState({
    name: "",
    price: "",
    date: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [shakeFields, setShakeFields] = useState([]);
  const { createNewspaper } = useNewspaperStore();
  const formRef = useRef(null);

  const fields = [
    { key: "name", label: "Newspaper Title", type: "text", placeholder: "e.g. The Daily Times"},
    { key: "price", label: "Price", type: "number", placeholder: "0.00", suffix: "EGP" },
    { key: "image", label: "Cover Image", type: "text", placeholder: "https://..." },
    { key: "date", label: "Publication Date", type: "date", placeholder: ""}
  ];

  const handleChange = (key, value) => {
    setNewNewspaper(prev => ({ ...prev, [key]: value }));
    if (key === "image") setImagePreview(value);
    setShakeFields(prev => prev.filter(f => f !== key));
  };

  const handleFocus = (key) => setFocusedField(key);
  const handleBlur = () => setFocusedField(null);

  const handleCreate = async () => {
    const emptyFields = fields.map(f => f.key).filter(key => !newNewspaper[key]);
    
    if (emptyFields.length > 0) {
      setShakeFields(emptyFields);
      toast.error("Please fill in all fields");
      setTimeout(() => setShakeFields([]), 600);
      return;
    }

    setLoading(true);
    const { success, message } = await createNewspaper({
      ...newNewspaper,
      price: Number(newNewspaper.price)
    });
    setLoading(false);

    if (success) {
      toast.success("Newspaper created successfully!");
      setNewNewspaper({ name: "", price: "", date: "", image: "" });
      setImagePreview("");
      navigate("/publish");
    } else {
      toast.error(message || "Something went wrong");
    }
  };

  const getProgress = () => {
    const filled = fields.filter(f => newNewspaper[f.key]).length;
    return (filled / fields.length) * 100;
  };

  return (
    <div className="create">
      <div className="create__bg">
        <div className="create__orb create__orb--1" />
        <div className="create__orb create__orb--2" />
      </div>

      <div className="create__card" ref={formRef}>
        <div className="create__header">
          <div className="create__icon">✨</div>
          <h2 className="create__title">Create Newspaper</h2>
          <p className="create__subtitle">Fill in the details below to publish your newspaper</p>
        </div>

        <div className="create__progress">
          <div 
            className="create__progress-bar" 
            style={{ width: `${getProgress()}%` }}
          />
          <span className="create__progress-text">{Math.round(getProgress())}%</span>
        </div>

        {imagePreview && (
          <div className="create__preview">
            <img src={imagePreview} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            <div className="create__preview-overlay" />
          </div>
        )}

        <div className="create__fields">
          {fields.map((field, index) => (
            <div 
              key={field.key}
              className={`create__field ${shakeFields.includes(field.key) ? 'create__field--shake' : ''} ${focusedField === field.key ? 'create__field--focused' : ''} ${newNewspaper[field.key] ? 'create__field--filled' : ''}`}
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <label className="create__label">
                {field.label}
              </label>
              <div className="create__input-wrap">
                <input
                  type={field.type}
                  min={field.type === "number" ? "0" : undefined}
                  placeholder={field.placeholder}
                  value={newNewspaper[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  onFocus={() => handleFocus(field.key)}
                  onBlur={handleBlur}
                />
                {field.suffix && newNewspaper[field.key] && (
                  <span className="create__suffix">{field.suffix}</span>
                )}
                {newNewspaper[field.key] && (
                  <span className="create__check">✓</span>
                )}
              </div>
              <div className="create__field-line" />
            </div>
          ))}
        </div>

        <button 
          className={`create__btn ${loading ? 'create__btn--loading' : ''} ${getProgress() === 100 ? 'create__btn--ready' : ''}`}
          onClick={handleCreate}
          disabled={loading}
        >
          <span className="create__btn-text">
            {loading ? (
              <>
                <span className="create__spinner" />
                Creating...
              </>
            ) : (
              <>
                Publish Newspaper
              </>
            )}
          </span>
          <div className="create__btn-ripple" />
        </button>

        <button className="create__back" onClick={() => navigate("/publish")}>
          ← Back to listings
        </button>
      </div>
    </div>
  );
};

export default CreatePage;