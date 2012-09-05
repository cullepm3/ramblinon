class CreateUserTeamsUsersHabtmTable < ActiveRecord::Migration
  def change
    create_table :user_teams_users, :id => false do |t|
      t.integer :user_team_id
      t.integer :user_id
    end
  end
end
