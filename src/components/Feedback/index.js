import { Subscribing } from "./Subscribing";

export const Feedback = () => {
    return (
        <section className="feedback">
            <div className="feedback-wrap">
                <div className="feedback-wrap-info">
                    <div className="feedback-preview-avatar"></div>
                    <div className="feedback-preview-comment">
                        <p className="feedback-info-txt">&laquo;Vestibulum quis porttitor dui! Quisque viverra nunc&nbsp;mi, 
                            <span className="txt-italics">a&nbsp;pulvinar purus condimentum&raquo;</span>
                        </p>
                    </div>
                </div>
                <Subscribing />
            </div>
        </section>
    );
}