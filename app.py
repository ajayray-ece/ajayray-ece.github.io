from flask import Flask, request, render_template, redirect
import smtplib
from email.message import EmailMessage

app = Flask(__name__)

@app.route('/')
def contact():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    # Compose email
    msg = EmailMessage()
    msg['Subject'] = f"New Message from {name}"
    msg['From'] = email
    msg['To'] = 'rayajayk@gmail.com'
    msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")

    # Send email using Gmail SMTP
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login('your_gmail@gmail.com', 'your_app_password')
            smtp.send_message(msg)
        return 'Message sent successfully!'
    except Exception as e:
        return f'Error sending message: {e}'

if __name__ == '_main_':
    app.run(debug=True)