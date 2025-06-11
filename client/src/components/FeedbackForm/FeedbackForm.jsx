import { useState } from "react";
import styles from "./FeedbackForm.module.css";
import "./customSelect.css";
import { useParams } from "react-router-dom";
import fetchServer from "../../utils/fetchServer";
import Select from "react-select";
import { ToastContainer, toast, Bounce } from 'react-toastify';


const FeedbackForm = ( { project, toggleForm }) => {
    const [browser, setBrowser] = useState(getBrowser());
    const [issueName, setIssueName] = useState("");
    const [otherBrowser, setOtherBrowser] = useState("");
    const [device, setDevice] = useState(getDeviceTypeWithFallback());
    const [description, setDescription] = useState("");
    const [pageUrl, setPageUrl] = useState("");
    const [request, setRequest] = useState("");
    const [screenshot, setScreenshot] = useState(null);
    const { id } = useParams();

    const requestTypeOptions = [
        { value: "Copy revision", label: "Copy revision" },
        { value: "New Item", label: "New Item" },
        { value: "Design Issues", label: "Design Issues" },
        { value: "Requested Change", label: "Requested Change" },
        { value: "Bugfix", label: "Bugfix" },
    ];

    const browserOptions = [
        { value: "Chrome", label: "Chrome" },
        { value: "Firefox", label: "Firefox" },
        { value: "Safari", label: "Safari" },
        { value: "Edge", label: "Edge" },
        { value: "Other", label: "Other" },
    ];

    const deviceOptions = [
        { value: "desktop", label: "Desktop" },
        { value: "tablet", label: "Tablet" },
        { value: "mobile", label: "Mobile" },
    ];
    
    function getBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes("Firefox/")) return "Firefox";
        if (ua.includes("Edg/")) return "Edge";
        if (ua.includes("Chrome/") && !ua.includes("Edg/") && !ua.includes("OPR/")) return "Chrome";
        if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
        if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
        return "";
    }

    function getDeviceTypeWithFallback() {
        const ua = navigator.userAgent;
        const width = window.innerWidth;
        if (/Tablet|iPad/.test(ua) || (width >= 600 && width <= 1024)) return "tablet";
        if (/Mobi|Android|iPhone|BlackBerry|IEMobile|Silk/.test(ua) || width < 600) return "mobile";
        return "desktop";
    }

    const selectColorMap = {
    "Copy revision": "#d97706",
    "New Item": "#2563eb",
    "Design Issues": "#dc2626",
    "Requested Change": "#16a34a",
    "Bugfix": "#7c3aed"
    };

const customStyles = (request) => ({
  control: (base, state) => ({
    ...base,
    borderColor: selectColorMap[request] || base.borderColor,
    boxShadow: state.isFocused ? `0 0 0 1px ${selectColorMap[request]}` : "none",
    "&:hover": {
      borderColor: selectColorMap[request] || base.borderColor
    }
  })
});

  const notifyError = () => 
    toast('❌ There was a problem', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      className: styles.toast
    });

    const notifySuccess = () => 
    toast('✅ Queried successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        className: styles.toast
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestId = crypto.randomUUID();
        const data = {
            name: issueName,
            request_type: request,
            browser: browser === "Other" ? otherBrowser : browser,
            device,
            description,
            pageUrl,
            screenshot,
            id,
            requestId,
        };
        const result = await fetchServer.setIssue(data, id);
        if(result && result.message.includes("Issue successfully")){
            notifySuccess();
            toggleForm();
        }else{
            notifyError();
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} data-request-type={request.toLowerCase().replace(/\s+/g, '-')}>
            <div>
                <label>
                    Name:
                    <input id="name" className={styles.formInput} type="text" name="issueName" value={issueName} onChange={(e) => setIssueName(e.target.value)} required />
                </label>
                <label>
                    Request type:
                    <Select
                        id="requestType"
                        options={requestTypeOptions}
                        value={requestTypeOptions.find(opt => opt.value === request)}
                        onChange={opt => setRequest(opt.value)}
                        classNamePrefix="react-select"
                        className={styles.formInput}
                        styles={customStyles(request)}
                    />
                </label>
            </div>
            <div className={styles.twoColumns}>
                <div className={styles.halfWidth}>
                    <label>
                        Browser:
                        <Select
                            id="browser"
                            options={browserOptions}
                            value={browserOptions.find(opt => opt.value === browser)}
                            onChange={opt => setBrowser(opt.value)}
                            classNamePrefix="react-select"
                            className={styles.formInput}
                        />
                    </label>
                    {browser === "Other" && (
                        <label>
                            Specify browser:
                            <input
                                type="text"
                                name="otherBrowser"
                                value={otherBrowser}
                                onChange={(e) => setOtherBrowser(e.target.value)}
                                required
                                className={styles.formInput}
                            />
                        </label>
                    )}
                </div>
                <div className={styles.halfWidth}>
                    <label>
                        Device
                        <Select
                            id="device"
                            options={deviceOptions}
                            value={deviceOptions.find(opt => opt.value === device)}
                            onChange={opt => setDevice(opt.value)}
                            classNamePrefix="react-select"
                            className={styles.formInput}
                        />
                    </label>
                </div>
            </div>
            <label>
                Request:
                <textarea id="description" className={`${styles.bigInput} ${styles.formInput}`} name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                Page URL:
                <input id="pageUrl" className={styles.formInput} type="text" name="pageUrl" value={pageUrl} onChange={(e) => setPageUrl(e.target.value)} />
            </label>
            <label>
                Screenshot:
                <input id="screenshot" className={styles.formInput} type="file" name="screenshot" accept="image/*" onChange={(e) => setScreenshot(e.target.files[0])} />
            </label>
            <div className={styles.buttonContainer}>
                <button id="buttonContainer1" className={`${styles.submitButton} ${styles.formInput}`} type="submit">Submit!</button>
                <button id="buttonContainer2" className={`${styles.anotherButton} ${styles.formInput}`} type="button"> + </button>
                <ToastContainer />
            </div>
        </form>
    );
};

export default FeedbackForm;
