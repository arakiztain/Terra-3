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
        <label>
            Request type:
            <select name="requestType" required>
            <option value="">Select...</option>
            <option value="Copy revision">Copy revision</option>
            <option value="Design Issues">Design Issues</option>
            <option value="Requested Change">Requested Change</option>
            </select>
        </label>

        <label>
            Status:
            <select name="status" required>
            <option value="">Select...</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
            </select>
        </label>

        <label>
            Request#:
            <input type="text" inputMode="numeric" pattern="[0-9]*" name="requestNumber" required />
        </label>

        <label>
            Input date:
            <input type="date" name="inputDate" required />
        </label>

        <label>
            Requester:
            <input type="text" name="requester" required />
        </label>

        <label>
            Device:
            <select name="device" value={getDeviceTypeWithFallback()} required>
                <option value="">Select...</option>
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
            </select>
        </label>

        <label>
            Browser:
            <select
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
            <label>
            Specify browser:
            <input
                type="text"
                name="otherBrowser"
                value={otherBrowser}
                onChange={(e) => setOtherBrowser(e.target.value)}
                required
            />
            </label>
        )}

        <label>
            Request:
            <textarea name="request" rows="4" required />
        </label>

        <label>
            Url:
            <input type="url" name="page" required />
        </label>

        <label>
            Screenshot:
            <input type="file" name="screenshot" accept="image/*"/>
        </label>

        <label>
            Terra comments:
            <textarea name="terraComments" rows="3" />
        </label>

        <button type="submit">Submit</button>
        </form>
    )
}

export default FeedbackForm;