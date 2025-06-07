import { useState } from "react";
import styles from "./FeedbackForm.module.css";

const FeedbackForm = () => {
    const [browser, setBrowser] = useState(getBrowser());
    const [otherBrowser, setOtherBrowser] = useState("");

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

    return(
        <form className={styles.form}>
        <div>
            <label>
                Request type: (Preguntar campos)
                <select name="requestType" className={styles.formInput} required>
                    <option value="">Select...</option>
                    <option value="Copy revision">Copy revision</option>
                    <option value="New Item">New Item</option>
                    <option value="Design Issues">Design Issues</option>
                    <option value="Requested Change">Requested Change</option>
                    <option value="Bugfix">Bugfix</option>
                </select>
            </label>
        </div>
        <div className={styles.twoColumns}>
            <div className={styles.halfWdith}>
                <label>
                    Browser:
                    <select
                    name="browser"
                    required
                    value={browser}
                    onChange={(e) => setBrowser(e.target.value)}
                    className={styles.formInput}
                    >
                    <option value="">Select...</option>
                    <option value="Chrome">Chrome</option>
                    <option value="Firefox">Firefox</option>
                    <option value="Safari">Safari</option>
                    <option value="Other">Other</option>
                    </select>
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
            <div className={styles.halfWdith}>
                <label> 
                    Device 
                    <select className={styles.formInput} name="device" value={getDeviceTypeWithFallback()} required>
                        <option value="">Select...</option>
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                        <option value="tablet">Tablet</option>
                    </select>
                </label>
            </div>
        </div>
        <label>
            Status:
            <select className={styles.formInput} name="status" required>
                <option value="">Select...</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
            </select>
        </label>

        <label>
            Request:
            <textarea className={`${styles.bigInput} ${styles.formInput}`} type="text" name="requestNumber" required />
        </label>

        <label>
            Page URL:
            <input className={styles.formInput} type="text" name="inputDate" required />
        </label>
        <label>
            Request:
            <textarea className={styles.formInput} name="request" rows="4" required />
        </label>

        <label>
            Url:
            <input className={styles.formInput} type="url" name="page" required />
        </label>

        <label>
            Screenshot:
            <input className={styles.formInput} type="file" name="screenshot" accept="image/*"/>
        </label>
            <div className={styles.buttonContainer}>
                <button className={styles.formInput} type="submit">Submit!</button>
                <button className={styles.formInput}> + </button>
            </div>
        </form>
    )
}

export default FeedbackForm;