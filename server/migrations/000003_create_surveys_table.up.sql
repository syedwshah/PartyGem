CREATE TABLE surveys (
    survey_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    question TEXT NOT NULL,
    question_type VARCHAR(50) CHECK (question_type IN ('text', 'mcq')),
    options JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);
