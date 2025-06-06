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
        <label className={styles.label}>
            Request type:
            <select className={styles.select} name="requestType" required>
            <option value="">Select...</option>
            <option value="Copy revision">Copy revision</option>
            <option value="Design Issues">Design Issues</option>
            <option value="Requested Change">Requested Change</option>
            </select>
        </label>

        <label className={styles.label}>
            Status:
            <select className={styles.select} name="status" required>
            <option value="">Select...</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
            </select>
        </label>

        <label className={styles.label}>
            Request#:
            <input className={styles.input} type="text" inputMode="numeric" pattern="[0-9]*" name="requestNumber" required />
        </label>

        <label className={styles.label}>
            Input date:
            <input className={styles.input} type="date" name="inputDate" required />
        </label>

        <label className={styles.label}>
            Requester:
            <input className={styles.input} type="text" name="requester" required />
        </label>

        <label className={styles.label}>
            Device:
            <select className={styles.select} name="device" value={getDeviceTypeWithFallback()} required>
                <option value="">Select...</option>
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
            </select>
        </label>

        <label className={styles.label}>
            Browser:
            <select className={styles.select}
            name="browser"
            required
            value={browser}
            onChange={(e) => setBrowser(e.target.value)}
            >
            <option value="">Select...</option>
            <option value="Chrome">Chrome</option>
            <option value="Firefox">Firefox</option>
            <option value="Safari">Safari</option>
            <option value="Other">Other</option>
            </select>
        </label>

        {browser === "Other" && (
            <label className={styles.label}>
            Specify browser:
                <input className={styles.input}
                type="text"
                name="otherBrowser"
                value={otherBrowser}
                onChange={(e) => setOtherBrowser(e.target.value)}
                required
            />
            </label>
        )}

        <label className={styles.label}>
            Request:
            <textarea className={styles.textarea} name="request" rows="4" required />
        </label>

        <label className={styles.label}>
            Url:
            <input className={styles.input} type="url" name="page" required />
        </label>

        <label className={styles.label}>
            Screenshot:
            <input className={styles.input} type="file" name="screenshot" accept="image/*"/>
        </label>

        <label className={styles.label}>
            Terra comments:
            <textarea className={styles.textarea} name="terraComments" rows="3" />
        </label>

        <button className={styles.button} type="submit">Submit</button>
        </form>
    )
}

export default FeedbackForm;