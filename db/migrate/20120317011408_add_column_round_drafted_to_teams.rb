class AddColumnRoundDraftedToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :round_drafted, :integer

  end
end
