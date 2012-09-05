class UserTeam < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :teams
  
  def pts 
    teams.sum {|team| team.pts}
  end
  
  def eliminated 
    remaining > 0
  end
  
  def money 
    money = low_seed_money + ff_money + champ_money
    
    if over
      user_teams= UserTeam.all
      user_teams.sort! {|a,b| b.pts <=> a.pts}
      if user_teams[0] == self
        money += 300
      end
    end
    money
  end
  
  def over
    total_pts = 32*6 + 16*4 + 8*3 + 4*3 + 2*2 +2
    user_teams= UserTeam.all
    user_teams.sort! {|a,b| b.pts <=> a.pts}
    earned_pts= user_teams.sum {|t| t.pts }
    remaining_pts= total_pts - earned_pts
    
    leader= user_teams[0]
    user_teams.each do |t| 
      if t!=leader
        return false if !t.eliminated && (t.pts + remaining_pts >= leader.pts)
      end
    end
    return true
  end
  
  def remaining 
    teams.sum { |team| !team.eliminated ? 1 : 0 }
  end
  
  def low_seed_money 
    lows= [Team.all[0]]
    Team.all.each do |team|
      if team.wins > 0
        if team.seed > lows[0].seed 
          lows=[team]
        elsif team.seed == lows[0].seed
          lows<<team
        end
      end
    end
    money= 0
    logger.info lows.to_s
    lows.each do |team|
      money += (team.user_team == self) ? 160/lows.count : 0
    end
    money
  end
  
  def ff_money
    ffs= []
    Team.all.each do |team|
      if team.wins >= 4
        ffs << team
      end
    end
    money= 0

    ffs.each do |team|
      money += (team.user_team == self) ? 75: 0
    end
    money
  end
  
  def finals_money
    money= 0
    Team.all.each do |team|
      if team.wins == 5
        money += (team.user_team == self) ? 50 : 0
      end
    end    
    return 0
  end
  
  def champ_money
    Team.all.each do |team|
      if team.wins == 6
        return 100 if team.user_team == self
      end
    end    
    return 0
  end

end
