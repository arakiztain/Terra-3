import { useState } from "react";
import styles from "./FeedbackForm.module.css";
import "./customSelect.css";
import { useParams } from "react-router-dom";
import fetchServer from "../../utils/fetchServer";
import Select from "react-select";

const FeedbackForm = () => {
    const [browser, setBrowser] = useState(getBrowser());
    const [issueName, setIssueName] = useState("");
    const [otherBrowser, setOtherBrowser] = useState("");
    const [device, setDevice] = useState(getDeviceTypeWithFallback());
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [inputDate, setInputDate] = useState("");
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
    
    const statusOptions = [
        { value: "open", label: "Open" },
        { value: "closed", label: "Closed" },
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: issueName,
            request,
            browser: browser === "Other" ? otherBrowser : browser,
            device,
            status,
            description,
            inputDate,
            screenshot,
        };
        fetchServer.setIssue(data, id);
        console.log("Formdata outside fetch");
        console.log(data, id);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input className={styles.formInput} type="text" name="issueName" value={issueName} onChange={(e) => setIssueName(e.target.value)} required />
                </label>
                <label>
                    Request type:
                    <Select
                        options={requestTypeOptions}
                        value={requestTypeOptions.find(opt => opt.value === request)}
                        onChange={opt => setRequest(opt.value)}
                        classNamePrefix="react-select"
                        className={styles.formInput}
                    />
                </label>
            </div>
            <div className={styles.twoColumns}>
                <div className={styles.halfWidth}>
                    <label>
                        Browser:
                        <Select
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
                Status:
                    <Select
                        options={statusOptions}
                        value={statusOptions.find(opt => opt.value === status)}
                        onChange={opt => setStatus(opt.value)}
                        classNamePrefix="react-select"
                        className={styles.formInput}
                    />
            </label>

            <label>
                Request:
                <textarea className={`${styles.bigInput} ${styles.formInput}`} name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>

            <label>
                Page URL:
                <input className={styles.formInput} type="text" name="inputDate" value={inputDate} onChange={(e) => setInputDate(e.target.value)} required />
            </label>

            <label>
                Screenshot:
                <input className={styles.formInput} type="file" name="screenshot" accept="image/*" onChange={(e) => setScreenshot(e.target.files[0])} />
            </label>

            <div className={styles.buttonContainer}>
                <button className={`${styles.submitButton} ${styles.formInput}`} type="submit">Submit!</button>
                <button className={`${styles.anotherButton} ${styles.formInput}`} type="button"> + </button>
            </div>
        </form>
    );
};

export default FeedbackForm;
