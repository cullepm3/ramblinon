class AddWinsToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :wins, :integer

    add_column :teams, :eliminated, :boolean

  end
end
