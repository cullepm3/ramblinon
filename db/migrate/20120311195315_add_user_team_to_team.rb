class AddUserTeamToTeam < ActiveRecord::Migration
  def change
    add_column :teams, :user_team_id, :integer

  end
end
