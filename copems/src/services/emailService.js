import emailjs from '@emailjs/browser'

class EmailService {
  constructor() {
    // EmailJS configuration - these should match your .env values
    this.publicKey = 'S2qQZi2YjAmbxclcp'
    this.serviceId = 'service_dtgwmpe'
    this.templateId = 'template_c0p808c'
    
    // Initialize EmailJS
    emailjs.init(this.publicKey)
    
    console.log('📧 Frontend EmailJS initialized with:', {
      publicKey: this.publicKey,
      serviceId: this.serviceId,
      templateId: this.templateId
    })
  }

  /**
   * Send email confirmation to user using EmailJS browser SDK
   * @param {string} userEmail - User's email address
   * @param {string} userName - User's name
   * @param {string} confirmationToken - Unique token for verification
   */
  async sendConfirmationEmail(userEmail, userName, confirmationToken) {
    try {
      const confirmationUrl = `${window.location.origin}/confirm-email?token=${confirmationToken}`
      
      // EmailJS template parameters - simplified for Gmail compatibility
      const templateParams = {
        to_name: userName,
        to_email: userEmail,
        user_name: userName,
        user_email: userEmail,
        confirmation_url: confirmationUrl,
        confirmation_token: confirmationToken,
        system_name: 'COPEMS',
        from_name: 'COPEMS Team',
        message: `Please verify your COPEMS account by clicking the link: ${confirmationUrl}`,
        subject: 'COPEMS Account Verification'
      }

      // Send email using EmailJS browser SDK
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      )
      
      return {
        success: true,
        messageId: response.text,
        status: response.status
      }

    } catch (error) {
      console.error('Failed to send confirmation email:', error.message || error.text)
      
      return {
        success: false,
        error: error.message || error.text || 'Failed to send email',
        errorType: error.name,
        emailjsError: error
      }
    }
  }
}

// Export singleton instance
export default new EmailService()