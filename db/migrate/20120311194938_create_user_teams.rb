class CreateUserTeams < ActiveRecord::Migration
  def change
    create_table :user_teams do |t|
      t.string :name
      t.integer :year

      t.timestamps
    end
  end
end
