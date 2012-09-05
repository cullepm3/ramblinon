class Team < ActiveRecord::Base
  belongs_to :user_team
  
  def draft_number
    if user_team && user_team.draft_position && round_drafted
      round_drafted * user_team.draft_position
    else
      nil
    end
  end
  
  def pts 
    case wins
      when 1
        6
      when 2
        10
      when 3
        13
      when 4
        16
      when 5
        18
      when 6
        20
      else
        0
      end
  end
end
