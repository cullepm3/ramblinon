class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :first_name, :last_name, :profile_image_url
  
  has_and_belongs_to_many :user_teams
  
  def name
    return first_name + " " + last_name[0,1] + "."
  end
  
  def profile_image_url
    default_url = "/assets/profile/#{first_name[0,2]}#{last_name[0,2]}.jpg".downcase
    url= read_attribute(:profile_image_url) ? read_attribute(:profile_image_url) : default_url 
  end
      
end
